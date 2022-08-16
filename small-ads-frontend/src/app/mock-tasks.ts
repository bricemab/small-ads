import { Task } from './task';
var loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque imperdiet posuere. Aenean at urna lacinia dolor auctor dignissim id vitae ipsum. Etiam non consectetur dolor. Donec euismod tincidunt justo, non accumsan dui pellentesque vel. Donec semper ultricies cursus. Donec fermentum libero condimentum, iaculis odio feugiat, vehicula nisl.";

export const TASKS: Task[] = [
    {id: 1, name: "Baby-sittings", price: "50 CHF", description: loremIpsum, time: "3h", location: "Sion", imageUrl: './assets/img/IMG_5894.jpg'},
    {id: 2, name: "Lavage voiture", price: "25 CHF", description: loremIpsum, time: "2h", location: "Martigny", imageUrl: './assets/img/carwash-exemple.jpg'},
    {id: 3, name: "Tonte pelouse", price: "40 CHF", description: loremIpsum, time: "1h", location: "Fully", imageUrl: './assets/img/mower-exemple.jpg'},
    {id: 4, name: "Tailler les haies", price: "30 CHF", description: loremIpsum, time: "2h", location: "Conthey", imageUrl: './assets/img/hedgeTrimming-exemple.jpg'}
];