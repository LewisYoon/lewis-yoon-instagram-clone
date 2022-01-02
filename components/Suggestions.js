import { useEffect, useState } from "react";
import faker from "faker";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="mt-4 ml-10 ">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestion for you</h3>
        <button className="text-gray-600 font-semibold cursor-pointer">
          See All
        </button>
      </div>
      {suggestions.map((profile) => (
        <div
          className="flex items-center justify-between mt-3"
          key={profile.id}
        >
          <img
            className="w-10 h-10 rounded-full border p-[2px]"
            src={`https://i.pravatar.cc/150?img=${profile.name}`}
            alt=""
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-xs text-gray-400 w-44 truncate">
              Works at {profile.company.name}
            </h3>
          </div>
          <button className="text-blue-400 text-xs ">Follow</button>
        </div>
      ))}
      <div className="mt-10 text-xs text-gray-400">
        © 2022 INSTAGRAM CLONE BY LEWIS YOON
        <div>Tutorial by Sonny Sangha</div>
      </div>
    </div>
  );
}

export default Suggestions;
