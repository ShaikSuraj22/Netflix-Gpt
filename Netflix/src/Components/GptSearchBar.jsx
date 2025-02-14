import React, { useRef } from "react";
import { BG, SUPPORTED_LANGUAGES } from "../Utils/constants";
import language from "../Utils/langConstants";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../Utils/configSlice";
import client from "../Utils/openai";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  const langkey = useSelector((store) => store.config.lang);
  // WE ARE USING IT FOR TO STORE THE INPUT TEXT INTO THE SEARCHTEXT VARIBALE, WITHOUT USING ANY E.TARGET.VALUE
  const searchText = useRef(null);

  const handleGptSearchText = async () => {
    console.log(searchText.current.value);
    // HERE WERE CALLING THE API- OF OPENAI
    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the Query" +
      searchText.current.value +
      " only give top 5 movies, comma seperated like the example result given ahead. Example result: GunturKaaram, RRR, Animal, Seetharamam, Lucky Bhaskar";
    const gptResults = await client.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-4o",
    });
    console.log(gptResults.choices);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BG})` }}
    >
      {/* Language Selector */}
      <div className="absolute top-5 right-50 z-10">
        <select
          onChange={handleLanguageChange}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white px-3 py-2 rounded-md shadow-md focus:outline-none"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Search Form */}
      <form
        className="absolute top-1/3 w-full max-w-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center bg-white shadow-lg rounded-full overflow-hidden p-2">
          <input
            ref={searchText}
            type="text"
            placeholder={language[langkey].gptPlaceholder}
            className="flex-1 px-4 py-2 text-gray-700 outline-none"
          />
          <button
            onClick={handleGptSearchText}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all"
          >
            {language[langkey].search}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;
