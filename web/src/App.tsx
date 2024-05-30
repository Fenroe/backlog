import { FormEvent, useRef, useState } from "react";
import { IoBookmarks } from "react-icons/io5";

interface BacklogItem {
  title: string;
  url: string;
}

export default function App() {
  const [backlog, setBacklog] = useState<BacklogItem[]>([]);

  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");

  const [url, setUrl] = useState<string>("");

  const draggedRef = useRef(0);

  const draggedOverRef = useRef(0);

  const showForm = () => setFormIsVisible(true);

  const addToBacklog = (evt: FormEvent) => {
    try {
      evt.preventDefault();
      const newItem: BacklogItem = {
        title,
        url,
      };
      setBacklog([newItem, ...backlog]);
      setTitle("");
      setUrl("");
      setFormIsVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSort = () => {
    const dataClone = [...backlog];
    const temp = dataClone[draggedRef.current];
    dataClone[draggedRef.current] = dataClone[draggedOverRef.current];
    dataClone[draggedOverRef.current] = temp;
    setBacklog(dataClone);
  };

  return (
    <>
      <header className="bg-red-500">
        <div className="mx-auto max-w-screen-xl h-10 flex items-center justify-between px-3">
          <div className="flex items-center gap-3">
            <IoBookmarks className="text-white" />
            <a href="/">
              <h1 className="font-bold text-xl hidden md:inline">
                <span>Back</span>
                <span className="text-white">log</span>
              </h1>
            </a>
          </div>
          <input placeholder="Search" className="px-2" />
          <i />
        </div>
      </header>
      <main>
        <section className="mx-auto max-w-screen-xl flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center">My backlog</h1>
          {formIsVisible ? (
            <form
              onSubmit={addToBacklog}
              className="flex flex-col gap-3 max-w-screen-sm items-center"
            >
              <div className="">
                <input
                  placeholder="Title"
                  className="border px-3 py-1 rounded-lg"
                  value={title}
                  onChange={(evt) => setTitle(evt.target.value)}
                />
                <label className="hidden">Title</label>
              </div>
              <div className="">
                <input
                  placeholder="URL"
                  className="border px-3 py-1 rounded-lg"
                  type="url"
                  value={url}
                  onChange={(evt) => setUrl(evt.target.value)}
                />
                <label className="hidden">URL</label>
              </div>
              <button
                type="submit"
                className="bg-red-500 text-white font-bold px-3 py-1 rounded-xl w-full"
              >
                Add to backlog
              </button>
            </form>
          ) : (
            <div className="flex flex-col max-w-screen-sm items-center">
              <button
                onClick={showForm}
                className="px-3 py-1 bg-red-500 rounded-xl text-white font-bold w-full"
              >
                Add to backlog
              </button>
            </div>
          )}
          <div className="w-full p-3">
            <ul>
              {backlog.map((item, idx) => (
                <li
                  className="flex items-center justify-between"
                  draggable
                  onDragStart={() => {
                    draggedRef.current = idx;
                  }}
                  onDragEnter={() => (draggedOverRef.current = idx)}
                  onDragEnd={handleSort}
                >
                  <a
                    className="font-bold"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    href={item.url}
                  >
                    {item.title}
                  </a>
                  <div className="">
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
