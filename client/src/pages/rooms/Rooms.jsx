import React from "react";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import RoomCard from "../../components/RoomCard/RoomCard";
import styles from "./Rooms.module.css";
import { useState } from "react";

const rooms = [
  {
    id: 1,
    topic: "Which framework best for frontend ?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/asset/monkey.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/asset/face.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 3,
    topic: "What’s new in machine learning?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/asset/monkey.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/asset/face.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 4,
    topic: "Why people use stack overflow?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/asset/monkey.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/asset/face.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 5,
    topic: "Artificial inteligence is the future?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/asset/monkey.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/asset/face.png",
      },
    ],
    totalPeople: 40,
  },
];

const Rooms = () => {
  const [showModel, setShowModel] = useState(false);
  function openModel() {
    setShowModel(true);
  }
  return (
    <>
      <div className="container">
        <div className={styles.roomHeader}>
          <div className={styles.left}>
            <span className={styles.heading}> All voice rooms</span>
            <div className={styles.searchBox}>
              <form>
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block w-48 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="search"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          <div className={styles.right}>
            <button
              onClick={openModel}
              type="button"
              class="text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              start room
            </button>
          </div>
        </div>

        <div className={styles.roomList}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      {showModel && <AddRoomModal />}
    </>
  );
};

export default Rooms;
