module.exports = {
    up: async ({ context: queryInterface }) => {
        const now = new Date();
        const heroes = [
            {
                nickname: "Superman",
                real_name: "Clark Kent",
                origin_description: "Born Kal-El on Krypton...",
                superpowers: "Flight, strength, heat vision",
                catch_phrase: "Look, up in the sky!",
                images: ["superman.jpg"],
                createdAt: now, updatedAt: now
            },
            {
                nickname: "Batman",
                real_name: "Bruce Wayne",
                origin_description: "Grew up in Gotham...",
                superpowers: "Intelligence, martial arts",
                catch_phrase: "I am Batman",
                images: ["batman.jpg"],
                createdAt: now, updatedAt: now
            },
            {
                nickname: "Wonder Woman",
                real_name: "Diana Prince",
                origin_description: "The daughter of Hippolyta, sculpted from clay...",
                superpowers: "Superhuman strength, flight, lasso of truth",
                catch_phrase: "I will fight for those who cannot fight for themselves.",
                images: ["wonder_woman.jpg"],
                createdAt: now, updatedAt: now
            },
            {
                nickname: "Spider-Man",
                real_name: "Peter Parker",
                origin_description: "Bitten by a radioactive spider during a science exhibit...",
                superpowers: "Wall-crawling, spider-sense, web-shooting",
                catch_phrase: "With great power comes great responsibility.",
                images: ["spiderman.jpg"],
                createdAt: now, updatedAt: now
            },
            {
                nickname: "Iron Man",
                real_name: "Tony Stark",
                origin_description: "A wealthy industrialist and genius inventor...",
                superpowers: "Powered armor suit, genius-level intellect",
                catch_phrase: "I am Iron Man.",
                images: ["ironman.jpg"],
                createdAt: now, updatedAt: now
            },
            {
                nickname: "Flash",
                real_name: "Barry Allen",
                origin_description: "Gained his powers after a lightning bolt hit a rack of chemicals...",
                superpowers: "Super speed, intangibility",
                catch_phrase: "I'm the fastest man alive.",
                images: ["flash.jpg"],
                createdAt: now, updatedAt: now
            },
            {
                nickname: "Aquaman",
                real_name: "Arthur Curry",
                origin_description: "The half-human, half-Atlantean King of the Seven Seas...",
                superpowers: "Underwater breathing, telepathy with marine life",
                catch_phrase: "Permission to come aboard?",
                images: ["aquaman.jpg"],
                createdAt: now, updatedAt: now
            },
            {
                nickname: "Hulk",
                real_name: "Bruce Banner",
                origin_description: "Caught in a gamma bomb explosion while saving a teenager...",
                superpowers: "Unlimited strength, regeneration",
                catch_phrase: "Hulk Smash!",
                images: ["hulk.jpg"],
                createdAt: now, updatedAt: now
            }
        ];

        await queryInterface.bulkInsert('Superheroes', heroes);
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.bulkDelete('Superheroes', null, {});
    }
};