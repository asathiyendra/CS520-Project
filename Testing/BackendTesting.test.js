const e = require("cors");


describe('Responses API Testing', () => {
    test('POST ADD Response request with valid data', async () => {
        const response = await fetch('http://127.0.0.1:8000/store_response/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'userid': 2,
                'promptid': 2,
                'text': "Wow! I feel the same",
                'visibility': "public"
            }),
        });
        expect(response.status).toBe(201);
        const data = await response.json();
        expect(data['userid']).toBe(2);
        expect(data['promptid']).toBe(2);
        expect(data['text']).toBe("Wow! I feel the same");
        expect(data['visibility']).toBe("public");
    });

    test('POST Add Response request with invalid data', async () => {
        const response = await fetch('http://127.0.0.1:8000/store_response/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // Invalid payload for testing
                'userid': 2,
                // Invalid Prompt ID
                'promptid': 155,
                'text': "Wow! I feel the same",
                'visibility': "public"
            }),
        });
        expect(response.status).toBe(400);
    })

    // Get User's Friends Responses
    test('GET Add Response request with invalid data', async () => {
        const response = await fetch('http://127.0.0.1:8000/friendsResponses?userid=1&promptid=1');
        expect(response.status).toBe(200);
        const data = await response.json();
        const expectedObjects = [
                {
                    "responseid": 2,
                    "userid": 2,
                    "promptid": 1,
                    "text": "I am most thankful for good health.",
                    "visibility": "private",
                    "date": "2023-11-24"
                }
        ];
        expect(data).toEqual(expect.arrayContaining(expectedObjects));
    })

    //Get Response Details 
    test('GET Response Details', async () => {
        const response = await fetch('http://127.0.0.1:8000/getResponseDetails/?responseid=1');
        expect(response.status).toBe(200);
        const data = await response.json();
    const expectedObject = {
        "responseid": 1,
        "userid": 1,
        "promptid": 1,
        "text": "I am most thankful for my family and friends.",
        "date": "2023-11-24T20:20:58.034349",
        "visibility": "public",
        "comments_count": 1,
        "comments": [
            {
                "commentid": 1,
                "userid": 2,
                "responseid": 1,
                "text": "That's wonderful! I feel the same.",
                "date": "2023-11-24"
            }
        ],
        "likes_count": 2,
        "likes": [
            {
                "likeid": 1,
                "userid": 1,
                "responseid": 1,
                "date": "2023-11-24"
            },
            {
                "likeid": 2,
                "userid": 2,
                "responseid": 1,
                "date": "2023-11-24"
            }
        ]
    };
    expect(data).toEqual(expectedObject);
    })

    // Get User's Responses for a Prompt
    test('GET Add Response request with invalid data', async () => {
        const response = await fetch('http://127.0.0.1:8000/previous_prompts/prompt_response/?promptid=1');
        expect(response.status).toBe(200);
        const data = await response.json();
        const expectedObjects = [
    {
        "responseid": 1,
        "userid": 1,
        "promptid": 1,
        "text": "I am most thankful for my family and friends.",
        "visibility": "public",
        "date": "2023-11-24"
    },
    {
        "responseid": 2,
        "userid": 2,
        "promptid": 1,
        "text": "I am most thankful for good health.",
        "visibility": "private",
        "date": "2023-11-24"
    },
    {
        "responseid": 3,
        "userid": 1,
        "promptid": 1,
        "text": "I am thankfull for pineapples",
        "visibility": "public",
        "date": "2023-12-05"
    },
    {
        "responseid": 10,
        "userid": 14,
        "promptid": 1,
        "text": "still alive",
        "visibility": "private",
        "date": "2023-12-07"
    },
    {
        "responseid": 14,
        "userid": 1,
        "promptid": 1,
        "text": "I am thankfull for pineapples",
        "visibility": "public",
        "date": "2023-12-14"
    }
];
        expect(data).toEqual(expect.arrayContaining(expectedObjects));
    })

});

describe('Friendships API tests', () => {
    // // Add Friends
    // test('POST Adding Friends', async () => {
    //     const response = await fetch('http://127.0.0.1:8000/friendships/add/', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             'userid': 7,
    //             'username_or_email': "john.doe@example.com"
    //         }),
    //     });
    //     expect(response.status).toBe(200);
    //     const data = await response.json();
    //     expect(data['message']).toBe("Friendship created successfully");
    // })

    // //Accpeting Friends
    // test('POST Accepting Friends', async () => {
    //     const response = await fetch('http://127.0.0.1:8000/friendships/accept/', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             'userid': 1,
    //             'friendid': 16
    //         }),
    //     });
    //     expect(response.status).toBe(200);
    //     const data = await response.json();
    //     expect(data['message']).toBe("Friendship accepted successfully");
    // })




    // Cannot add friends that are alredy friends
    test('POST Adding Friends that are alredy friends', async () => {
        const response = await fetch('http://127.0.0.1:8000/friendships/add/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'userid': 1,
                'username_or_email': "khiem126@gmail.com"
            }),
        });
        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data['error']).toBe("Friendship already exists");
    })

    // Get Friends
        test('GET Friends', async () => {
            const response = await fetch('http://127.0.0.1:8000/friendships/?userid=1');
            expect(response.status).toBe(200);
            const data = await response.json();

            const expectedObjects = [
    {
        "status": "accepted",
        "user": {
            "userid": 2,
            "username": "jane_smith",
            "email": "jane.smith@example.com"
        }
    },
    {
        "status": "pending",
        "user": {
            "userid": 16,
            "username": "khiem126",
            "email": "khiem126@gmail.com"
        }
    },
    {
        "status": "pending",
        "user": {
            "userid": 15,
            "username": "khiem125",
            "email": "khiem125@gmail.com"
        }
    },
    {
        "status": "accepted",
        "user": {
            "userid": 3,
            "username": "john_smith_updated",
            "email": "john_smith_updated@example.com"
        }
    },
    {
        "status": "accepted",
        "user": {
            "userid": 2,
            "username": "jane_smith",
            "email": "jane.smith@example.com"
        }
    }
];
            expect(data).toEqual(expect.arrayContaining(expectedObjects));
        })
    // Cannot add friends that do not exist
    test('POST Adding Friends that are alredy friends', async () => {
        const response = await fetch('http://127.0.0.1:8000/friendships/add/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'userid': 1,
                'username_or_email': "himothy@gmail.com"
            }),
        });
        expect(response.status).toBe(404);
        const data = await response.json();
        expect(data['error']).toBe("User does not exist");
    })

});

describe('Prompt API tests', () => {
    // Get Prompts
    test('GET Prompts', async () => {
        const response = await fetch('http://127.0.0.1:8000/prompts/');
        expect(response.status).toBe(200);
        const data = await response.json();
        const expectedObjects = [
            {
                "promptid": 1,
                "date": "2023-11-24",
                "text": "What are you most thankful for today?"
            },
            {
                "promptid": 2,
                "date": "2023-11-23",
                "text": "What is your favorite memory from the past year?"
            },
            {
                "promptid": 3,
                "date": "2022-01-01",
                "text": "if you were an animal what would you be?"
            },
            {
                "promptid": 4,
                "date": "2023-01-01",
                "text": "Testing out a prompt"
            }
        ];
        
        expect(data).toEqual(expect.arrayContaining(expectedObjects));

    });

    // Add Prompt to the Database
    test('POST Add Prompt to Database', async () => {
        const response = await fetch('http://127.0.0.1:8000/prompts/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'date': '2023-01-01',
                'text': "Testing out a prompt 4"
            }),
        });
        expect(response.status).toBe(201);
        const data = await response.json();
        expect(data).toHaveProperty('promptid');
        expect(data).toHaveProperty('date');
        expect(data).toHaveProperty('text');
    })

    // Get Random Prompt
        test('GET Random Prompt', async () => {
        const response = await fetch('http://127.0.0.1:8000/prompts/random_prompt/');
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('promptid');
        expect(data).toHaveProperty('date');
        expect(data).toHaveProperty('text');
        })
    
    // GET all previous prompts
    test('GET Previouds Prompts', async () => {
        const response = await fetch('http://127.0.0.1:8000/previous_prompts/');
        expect(response.status).toBe(200);
        const data = await response.json();
        const expectedObjects = [
    {
        "promptid": 1,
        "date": "2023-11-24",
        "text": "What are you most thankful for today?"
    },
    {
        "promptid": 2,
        "date": "2023-11-23",
        "text": "What is your favorite memory from the past year?"
    },
    {
        "promptid": 3,
        "date": "2022-01-01",
        "text": "if you were an animal what would you be?"
    },
    {
        "promptid": 4,
        "date": "2023-01-01",
        "text": "Testing out a prompt"
    },
    {
        "promptid": 5,
        "date": "2023-01-01",
        "text": "Testing out a prompt 2"
    }
];
        
        expect(data).toEqual(expect.arrayContaining(expectedObjects));

    });

    
});





// describe('get_friends_responses API tests', () => {
//     test('GET request with valid userid and promptid', async () => {
//         const response = await fetch('http://127.0.0.1:8000/friendsResponses/?userid=1&promptid=1');
//         expect(response.status).toBe(200);
//         const data = await response.json();
//         expect(data['userid']).toBe(1);
//         expect(data['promptid']).toBe(1);
//         // Add more assertions based on the expected shape of your data
//     });

//     test('GET request with missing query parameters', async () => {
//         const response = await fetch('http://127.0.0.1:8000/friendsResponses/?userid=1');
//         expect(response.status).toBe(400);
//         const data = await response.json();
//         expect(data.error).toBe('Missing userid or promptid in query parameters');
//     });

//     test('GET request for non-existent prompt', async () => {
//         const response = await fetch('http://127.0.0.1:8000/friendsResponses/?userid=1&promptid=9999');
//         expect(response.status).toBe(400);
//         const data = await response.json();
//         expect(data.error).toBe('Prompt does not exist');
//     });
// });

