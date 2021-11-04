const db = require('../db/index.js');
const app = require("../app.js");
const testData = require('../db/data/test-data/index.js');
const request = require("supertest");
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("API Test ", () => {

    describe("Test 1 :- GET request to see if server is listening and data has been sent back", () => {
        test("API connection successful", () => {
            return request(app)
                .get("/api")
                .expect(200)
                .then(({ body }) => {
                    expect(body).toEqual({ msg: "API Connection Successful, Welcome Back Commander" });
                })
        })

        test("GET * categories", () => {
            const categoryObject = {
                slug: expect.any(String),
                description: expect.any(String)
            }
            return request(app)
                .get("/api/categories")
                .expect(200)
                .then(({ body }) => {
                    expect(body.categories[0]).toEqual(categoryObject);
                })
        })

        test("GET * users", () => {
            const userObject = {
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String)
            }
            return request(app)
                .get("/api/users")
                .expect(200)
                .then(({ body }) => {
                    expect(body.users[0]).toEqual(userObject);
                })
        })

        test("GET * reviews", () => {
            const reviewObject = {
                review_id: expect.any(Number),
                title: expect.any(String),
                review_body: expect.any(String),
                designer: expect.any(String),
                review_img_url: expect.any(String),
                votes: expect.any(Number),
                category: expect.any(String),
                owner: expect.any(String),
                created_at: expect.any(String)
            }
            return request(app)
                .get("/api/reviews")
                .expect(200)
                .then(({ body }) => {
                    expect(body.reviews[0]).toEqual(reviewObject);
                })
        })

        test("GET * comments", () => {
            const commentObj = {
                comment_id: expect.any(Number),
                author: expect.any(String),
                review_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                body: expect.any(String)
            }
            return request(app)
                .get("/api/comments")
                .expect(200)
                .then(({ body }) => {
                    expect(body.comments[0]).toEqual(commentObj)
                })
        })
        test("GET by username", () => {
            const mallionaireObj = {
                "username": "mallionaire",
                "avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                "name": "haz"
            }
            return request(app)
                .get("/api/users/mallionaire")
                .expect(200)
                .then(({ body }) => {
                    expect(body.user).toEqual([mallionaireObj])
                })
        })
        test("Get by reviews_id", () => {
            const reviewObj = {
                "review_id": 3,
                "title": "Ultimate Werewolf",
                "review_body": "We couldn't find the werewolf!",
                "designer": "Akihisa Okui",
                "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                "votes": 5,
                "category": "social deduction",
                "owner": "bainesface",
                "created_at": "2021-01-18T10:01:41.251Z"
            }
            return request(app)
                .get("/api/reviews/3")
                .expect(200)
                .then(({ body }) => {
                    expect(body.review).toEqual([reviewObj])
                })
        })
    })
    describe("Test 2:- PATCH valid inputs can be added to the database", () => {
        test("Update reviews with new content", () => {
            const editReview = {
                "title": "Super Ultimate Werewolf Beyond The Stars",
                "designer": "Akihisa Okui The Third"
            }
            const reviewObj = {
                "review_id": 3,
                "title": "Super Ultimate Werewolf Beyond The Stars",
                "review_body": "We couldn't find the werewolf!",
                "designer": "Akihisa Okui The Third",
                "review_img_url": "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                "votes": 5,
                "category": "social deduction",
                "owner": "bainesface",
                "created_at": "2021-01-18T10:01:41.251Z"
            }
            return request(app)
                .patch("/api/reviews/3")
                .send(editReview)
                .expect(204)
                .then(({ body }) => {
                    expect(body.review).toEqual(reviewObj)
                })
        })
    })

})