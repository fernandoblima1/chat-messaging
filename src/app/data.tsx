export const messagesData: Message[] = [
  {
    id: 1,
    content: "Oi, João",
    user: { id: 1, name: "Maria Silva", avatar: "/User1.png" },
    timestamp: "2024-08-01T18:00:00Z",
  },
  {
    id: 2,
    content: "Oi!",
    user: { id: 5, avatar: "/LoggedInUser.jpg", name: "Pedro Santos" },
    timestamp: "2024-08-01T18:01:00Z",
  },
  {
    id: 3,
    content: "Como você está?",
    user: { id: 1, name: "Maria Silva", avatar: "/User1.png" },
    timestamp: "2024-08-01T18:02:00Z",
  },
  {
    id: 4,
    content: "Estou bem, e você?",
    user: { id: 5, avatar: "/LoggedInUser.jpg", name: "Pedro Santos" },
    timestamp: "2024-08-01T18:03:00Z",
  },
  {
    id: 5,
    content: "Também estou bem!",
    user: { id: 3, name: "Ana Clara", avatar: "/User3.png" },
    timestamp: "2024-08-01T18:04:00Z",
  },
  {
    id: 6,
    content: "Que bom ouvir isso!",
    user: { id: 5, avatar: "/LoggedInUser.jpg", name: "Pedro Santos" },
    timestamp: "2024-08-01T18:05:00Z",
  },
  {
    id: 7,
    content: "Você vai fazer algo hoje?",
    user: { id: 1, name: "Maria Silva", avatar: "/User1.png" },
    timestamp: "2024-08-01T18:06:00Z",
  },
  {
    id: 8,
    content:
      "Pessoal que tal irmos no cinema hoje? Estou pensando em assistir um filme.",
    user: { id: 2, name: "João Souza", avatar: "/User2.png" },
    timestamp: "2024-08-01T18:07:00Z",
  },
  {
    id: 9,
    content: "Eu topo, tive um dia bem relaxante. Apenas lendo alguns livros.",
    user: { id: 3, name: "Ana Clara", avatar: "/User3.png" },
    timestamp: "2024-08-01T18:08:00Z",
  },
  {
    id: 9,
    content: "Eu também! Vamos sim!",
    user: { id: 5, avatar: "/LoggedInUser.jpg", name: "Pedro Santos" },
    timestamp: "2024-08-01T18:08:00Z",
  },
];

export const onlineUsersData: User[] = [
  {
    id: 1,
    avatar: "/User1.png",
    name: "Maria Silva",
  },
  {
    id: 2,
    avatar: "/User2.png",
    name: "João Souza",
  },
  {
    id: 3,
    avatar: "/User3.png",
    name: "Ana Clara",
  },
  {
    id: 4,
    avatar: "/User4.png",
    name: "Carlos Pereira",
  },
];

export type MessageData = Message[];

export const loggedInUserData: User = {
  id: 5,
  avatar: "/LoggedInUser.jpg",
  name: "Pedro Santos",
};

export type LoggedInUserData = User;

export interface Message {
  id: number;
  content: string;
  user: User;
  timestamp: string;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
}
