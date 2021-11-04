const db = require("../index.js")
const format = require("pg-format");

const seed = (data) => {

  const { categoryData, commentData, reviewData, userData } = data;

  // 1. create tables
  const createCategories = `( 
      slug VARCHAR(255) PRIMARY KEY,
      description VARCHAR(255)
    );`;

  //Keys 
  const keysCategories = `(
    slug,
    description
    )`;

  const createUsers = `(
      username VARCHAR(255) PRIMARY KEY,
      avatar_url TEXT,
      name VARCHAR(255)
    );`;

  const keysUsers = `(
    username,
    name,
    avatar_url
  )`;

  const createReviews = `( 
      review_id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      review_body TEXT,
      designer VARCHAR(255),
      review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      votes INT DEFAULT 0,
      category VARCHAR(255) REFERENCES categories(slug),
      owner VARCHAR(255) REFERENCES users(username),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`;

  const keysReviews = `(
    title,
    designer,
    owner,
    review_img_url,
    review_body,
    category,
    created_at,
    votes
  )`;

  const createComments = `( 
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(255) REFERENCES users(username),
      review_id INT REFERENCES reviews(review_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      body TEXT
  );`;

  const keysComments = `(
    body,
    votes,
    author,
    review_id,
    created_at
  )`

  const tablesArr = [`comments`, `reviews`, `users`, `categories`]

  const tableObjects = {
    comments: {
      create: createComments,
      insert: commentData,
      keys: keysComments
    },
    reviews: {
      create: createReviews,
      insert: reviewData,
      keys: keysReviews
    },
    users: {
      create: createUsers,
      insert: userData,
      keys: keysUsers
    },
    categories: {
      create: createCategories,
      insert: categoryData,
      keys: keysCategories
    }
  }


  let dropTable = `DROP TABLE IF EXISTS `;
  let createTable = `CREATE TABLE `;
  let insertInto = `INSERT INTO `;
  let values = ` VALUES %L RETURNING*;`;

  const dropForLoop = async () => {
    // console.log("\nStart DROP loop");
    let removeQueryStr;
    let removeTableQuery;

    for (const table of tablesArr) {
      removeQueryStr = dropTable + table + ";";
      removeTableQuery = await db.query(removeQueryStr);
      // console.log("DROPPED", table)
    }

    // console.log("End DROP loop\n");
    return removeTableQuery;
  }

  const createForLoop = async () => {
    // console.log("\nStart CREATE TABLE loop");
    let addQueryStr;
    let addTableQuery;

    for (const table of tablesArr.reverse()) {
      addQueryStr = createTable + table + tableObjects[table].create;
      addTableQuery = await db.query(addQueryStr);
      // console.log("CREATED TABLE", table)
    }
    // console.log("End CREATE TABLE loop\n");
    return addTableQuery;
  }

  const createInsertLoop = async () => {
    // console.log("\nStart INSERT INTO loop" )
    let inputQueryStr;
    let inputDataQuery;
    let inputDataValues;

    for (const table of tablesArr) {
      inputDataValues = tableObjects[table].insert.map((parameters, index) => {
        const params = Object.values(parameters)
        return params;
      })

      inputQueryStr = insertInto + table + tableObjects[table].keys + values;
      const formatStr = format(inputQueryStr, inputDataValues)
      inputDataQuery = await db.query(formatStr)
      // console.log("Data INSERT INTO", table)
    }
    // console.log("END INSERT INTO loop\n")
    return inputDataQuery;
  }

  return dropForLoop()
    .then(() => {
      return createForLoop()
    }).then(() => {
      return createInsertLoop()
    })

};

module.exports = seed;
