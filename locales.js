// go through everything, texts tagged with <> should be edited
const locales = {
    generic: {
        read: "Read",
        leave: "Leave",
        yes: "Yes",
        no: "No",
        exit: "Exit",
        dots: "...",
        next: "Next"
    },
    skills: {
        approach: "This is my skills section",
        text: {
            technical: "My technical skills are: HTML, CSS, JS, TS, Vue, React, Cypress, Sass, SCSS, REST API, Ionic, Git + Github.",
            learning: "I'm currently learning computer science and algorithms.",
            languages: "Languages I speak are English and German (full professional proficiency), Polish (native)."
        }
    },
    info: {
        approach: "This is me! Or just a bunch of talking pixels. Anyway, hi!",
        text: {
            greet: " My name is Joanna Pawlik and I'm a Frontend Developer based in Berlin, Germany.",
            personal: "I'm a former artist, that has fallen into coding.",
            room: "Interacting with the following items in the room will show you specific information about myself, such as skills and my work experience.",
            info: "You can find my contact information in a drawer next to you. Please help yourself."

        },
        choices: {
            abt: "About me",
            abtrm: "About this room",
        }
    },
    education: {
        approach: "This is my education section. On a bookshelf. How convenient!",
        text: {
            university: "I have a Master of Arts degree in orchestra music and double-bass (graduated in 2017) at Franz Liszt Music University in Weimar, Germany.",
            technical: "In 2020 I've started to learn coding by joining a bootcamp (Coders Lab, based in Poland) that I attended for 8 months and completed."
        }
    },
    exp: {
        approach: "This is my work experience section. Also a tribute to my first PC, that I've broken in 1995. Rest in peace IBM PC/XT. May the thunder be with you.",
        text: {
            relevant: "From August 2021 until October 2022 I was working as a Junior Frontend Developer in a FinTech startup Vantik.",
            pervious: "In years 2017-2020 I worked as a double bass player in orchestras such as Neubrandenburger Philharmonie and Berliner Symphoniker.",
            irrelevant: "Previous to that, apart from freelancing as a musician I worked as a barkeeper, barista and social media manager in gastronomic facilities."
        }

    },
    prompts: {
        enter: "<instructions to navigate>",
        leave: "<bye>"
    },
    hobbies: {
        approach: "This is my hobbies section. Or just an old TV",
        text: {
            watch: "I'm a massive art nerd - I love music, painting and crafts",
            game: "Luckily, there is one medium that combines every skill I have, which is a video game.",
            dev: "So I'm developing RPG games as a hobby now and it's really cool."
        }
    },
    drawer: {
        approach: "Just a regular drawer with everything in a world in there. Including my CV.",
        text: {
            download: "Would you like to download my CV as a PDF?",
            confirm: "Good, otherwise you'd be looking just into my virtual sock drawer.",
            decline: "Ok! You memory must be outstanding."
        }
    },
    cookie: {
        approach: "Behind the vase you see a cookie.",
        text: {
            see: "That's a cookie.",
            mine: "I was going to eat that.",
            question: "Are you really that hungry?",
            share: "Ok, I guess we can share..."
        }
    },
    sofa: {
        approach: "This sofa is blue to remind you how the sky looks like.",
        text: {
            sit: "There is no time for chillaxing!"
        }
    },
    flower: {
        approach: "A golden flower in a vase. It reminds you of someone.",
        text: {
        }
    },
    bin: {
        approach: "This is a bin with some trash inside",
        text: {
            see: "After a brief look you see some good ideas in there.",
            mine: "The ideas are dead which technically makes it a graveyard.",
            thought: "This creepy thought made you uncomfortable."
        }
    },
}
