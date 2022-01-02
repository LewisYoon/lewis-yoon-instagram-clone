import faker from "faker";
import { useEffect, useState } from "react";
import Story from "./Story";

import { useSession } from "next-auth/react";

function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    console.log(suggestions);
    setSuggestions(suggestions);
  }, []);

  const { data: session } = useSession();

  return (
    <div
      className="flex space-x-2 p-6 bg-white
    mt-8 border-gray-200 border rounded-sm overflow-x-scroll"
      // scrollbar-thin scrollbar-thumb-black
    >
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.name}
          // originally,for img, it should be img={profile.avatar} but fakercloud is not working atm
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
