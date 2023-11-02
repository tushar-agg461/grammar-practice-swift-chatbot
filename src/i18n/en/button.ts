
export const buttons = (recipientMobile) => {
    return {
      to: recipientMobile,
      type: 'button',
      button: {
        body: {
          type: 'text',
          text: {
            body: 'Hello, click on the button to filter the {2} class maths videos.',
          },
        },
        buttons: [
          {
            type: 'solid',
            body: 'Mathematics, Class 1',
            reply: 'Mathematics, Class 1',
          },
          {
            type: 'solid',
            body: 'Mathematics quiz, Class 1',
            reply: 'Mathematics quiz, Class 1',
          },
          {
            icon: 'registration',
            type: 'dotted',
            body: 'Add another student',
            reply: 'Add another student',
          },
        ],
        allow_custom_response: false,
      },
    };
  };
  
export const createArticleMessage = (recipientMobile) => {
    return {
        to: recipientMobile,
        type: 'article',
        article: [
          {
            tags: ["article"],
            title: "education",
            description: "Article message from the University",
            actions: [
              {
                button_text: 'Read More',
                type: 'website',
                website: {
                  title: 'Read More',
                  payload: "article_payload",
                  url: "https://www.google.com/",
                },
              },
            ],
          },
        ],
      };
};
