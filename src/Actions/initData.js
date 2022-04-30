export const initData = {
  boards: [
    {
      id: "board-1",
      columnOrder: ["column-1", "column-2", "column-3"],
      columns: [
        {
          id: "column-1",
          boardId: "board-1",
          title: "Todo column 1",
          cardOrder: ["card-1", "card-2", "card-3", "card-4", "card-5"],
          cards: [
            {
              id: "card-1",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card-1",
              img: "https://www.w3schools.com/bootstrap4/img_avatar3.png",
            },
            {
              id: "card-2",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card-2",
              img: null,
            },
            {
              id: "card-3",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card-3",
              img: null,
            },
            {
              id: "card-4",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card-4",
              img: null,
            },
            {
              id: "card-5",
              boardId: "board-1",
              columnId: "column-1",
              title: "Title of card-5",
              img: null,
            },
          ],
        },
        {
          id: "column-2",
          boardId: "board-1",
          title: "Doing column 2",
          cardOrder: ["card-6", "card-7", "card-8"],
          cards: [
            {
              id: "card-6",
              boardId: "board-1",
              columnId: "column-2",
              title: "Title of card-6",
              img: "https://www.w3schools.com/bootstrap4/img_avatar3.png",
            },
            {
              id: "card-7",
              boardId: "board-1",
              columnId: "column-2",
              title: "Title of card-7",
              img: null,
            },
            {
              id: "card-8",
              boardId: "board-1",
              columnId: "column-2",
              title: "Title of card-8",
              img: null,
            },
          ],
        },
        {
          id: "column-3",
          boardId: "board-1",
          title: "Done column 3",
          cardOrder: ["card-9", "card-10"],
          cards: [
            {
              id: "card-9",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of card-9",
              img: "https://www.w3schools.com/bootstrap4/img_avatar3.png",
            },
            {
              id: "card-10",
              boardId: "board-1",
              columnId: "column-3",
              title: "Title of card-10",
              img: null,
            },
          ],
        },
      ],
    },
  ],
};
