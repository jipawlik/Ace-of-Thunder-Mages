const drawerNodes = [
    {
        id: 1,
        text: "Just a regular drawer with everything in a world in there. Including my CV.",
        
    },
    {
        id: 2,
        text: 'Would you like to download my CV as a PDF or view contact data?',
        options: [
            {
            text: 'CV',
            // setState: { selected: true },
            nextText: 3
            },
            {
            text: 'Contact',
            nextText: 4
            },
            {
            text: 'Nevermind',
            nextText: 5
            }
        ]
    },
    {
        id: 3,
        text: "Good, otherwise you'd be looking just into my virtual sock drawer.",
        flag: "finish"

    },
    {
        id: 4,
        text: "There you go <no data>",
        flag: "finish"

    },
    {
        id: 5,
        text: "Ok! You memory must be outstanding.",
        flag: "finish"

    },
  ]
  