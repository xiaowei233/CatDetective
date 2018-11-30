
var dialogue = {
    "white": {
        name: "White",
        intro: "What do you like to know?",
        investigate: [
            {name: "About the scene", content: ["I was playing with my ball before dinner, and after dinner at around 8, it is gone. It may have something to do with today's food, it was so nice that I took longer than usual to finish."]},
            {name: "About other cats", content: [
                {name: "About Gray", content: "He just moved to our next door, and after he found out Black also likes rock music, he just comes by a lot to play with Black."}, 
                {name: "About Orange", content: "He said he is homeless, and he likes homeless, because he doesn't want to be a fat orange cat like all others."}, 
                {name: "About Black", content: "He is my roomie, very considerate, but at the same time likes rock music, what a wierd cat."}, 
            ]},
            {name: "About diary", privacy: "hidden", content: "Oh that is my diary, nothing special, but you can see its content now."},
            {name: "I know who the thief is", content: [
            ]}, 
        ]
    },
    "orange": {
        name: "Orange",
        intro: "What do you like to know?",
        investigate: [
            {name: "About the scene", content: ["What, I just returned here, but I think those two male cats are both suspecious."]},
            {name: "About other cats", content: [
                {name: "About Gray", content: "I just saw him today, no comment."}, 
                {name: "About White", content: "White is such a cat...you know, every cat who knows her just want to protect her."}, 
                {name: "About Black", content: "Don't like this guy, no comment"}, 
            ]},
        ]
    },
    "gray": {
        name: "Gray",
        intro: "What do you like to know?",
        investigate: [
            {name: "About the scene", content: ["I know they White and Black usually finish their dinner at 8, so I came over a little bit later than 8."]},
            {name: "About other cats", content: [
                {name: "About Orange", content: "I heard White respects him a lot, but Black hates him."}, 
                {name: "About Black", content: "It is hard to find a cat to enjoy ROOOCK music these days, nice guy, peace."}, 
                {name: "About White", content: "To be honest, the main reson for me to come over so often...is not Black but White. Don't tell anybody."},
            ]},
        ]
    },
    "black": {
        name: "Black",
        intro: "What do you like to know?",
        investigate: [
            {name: "About the scene", content: ["I was eating with White when her ball is stolen..so it can't be me."]},
            {name: "About other cats", content: [
                {name: "About Gray", content: "Glad Gray moved to our neighbor, such a wonderful cat to talk with, he even brought us a special flavor cat food few days ago."}, 
                {name: "About Orange", content: "Wild cat has wild cat's way to survive, don't know why he comes to our house so often."}, 
                {name: "About White", content: "It is lucky that I can see White everyday, she is so beautiful."}, 
            ]},
        ]
    },    
    "desk": {
        name: "desk",
        intro: "A simple but nice desk for working and reading.",
        investigate: [
            {name: "desktop", content: ["There many files on the desktop, but none of them seem to be of what a cat can understand."]},
            {name: "drawers", content: ["All drawers are locked."]},
            {name: "diary", content: ["The diary White writes. (Why would a cat write a diary)"]},
            {name: "opendiary", privacy: "hidden", content: [
                "15th, Today's Black's birthday! And it turns out to be Gray's birthday too! What a coincidence!",
                "17th, Gray said he found a very special cat in landfill looking for something, so he won't come to play for a short time."
            ]}
        ],
    },
    "sofa": {
        name: "sofa",
        intro: "A very soft couch, so comfortable that every cat must be wanting to scratch it.",
        investigate: ["Just a very comfortable couch, nothing is special."],
    },
    "stereo": {
        intro: "A set of very loud stereo speakers.",
        investigate: ["Just a very loud speaker, nothing is special."],
    },
    "tv": {
        name: "tv",
        intro: "A 81 inch television, best duo with the couch.",
        investigate: ["Just a very EXPENSIVE tv, nothing is special"],
    },
    "door": {
        intro: "Not Yet Developed",
        investigate: [],
    },
    "shoerack": {
        intro: "s",
        investigate: ["There are shoes of two different sizes, all shoes have similar styles.",
            "They stink."],
    },
    "pot": {
        intro: "A very common plant that you see around this street.",
        investigate: [
            {name: "dirt", content: ["There are some green paper in the dirt, seemed to be purposefully buried, and you teared them apart."]},
            {name: "tree", content: ["A very healthy tree, spreading fragrance as a cat you like."]}
        ],
    },
    "catstand": {
        intro: "What a luxury, this is what every cat needs to survive.",
        investigate: ["Just a vary fun and interesting furniture, at least for cat is"],
    },
    "window": {
        name: "window",
        intro: "It is already deep night, the outside is dark",
        investigate: [
            {name: "window", content: ["The window seemed to be once opened."]},
            {name: "side", content: ["There are some cat footsteps, but apparently not from only one cat"]},
            {name: "outside", content: ["Across the street you can barely see a abandoned park."]}
        ],
    },
    "shelf": {
        intro: "Lots of books, and gladly you can understand none.",
        investigate: [
            {name: "drawers", content: ["Both of the drawers are locked"]},
            {name: "books", content: ["You are lucky you don't need to know what all these books are about."]},
            {name: "collections", content: ["Three beautiful porcelains stand on the shelf, you raise a desire to push them off the shelf, but you didn't."]},
        ],
    },
    "catbed": {
        name: "catbed",
        intro: "Two cat bed filled with soft fur and silk.",
        investigate: ["You lie in the bed and take a short nap"],
    },
    "bed": {
        name: "bed",
        intro: "What to you expect from a bed.",
        investigate: ["It is quite big a bed for one person."],
    },
    "photo": {
        name: "photo",
        intro: "Perhaps the only decoration in the room",
        investigate: ["But it doesn't provide any useful information."],
    },
    "bedside": {
        intro: "A simple bedside table, but there is no lamp.",
        investigate: ["Nothing to check here."],
    }
}
