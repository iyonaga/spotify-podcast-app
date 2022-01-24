import SearchIcon from '../icons/Search';

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  query: string;
}

const SearchInput: React.VFC<Props> = ({
  handleChange,
  handleKeyPress,
  query,
}) => {
  return (
    <div className="group relative">
      <div className="absolute top-[15px] left-[23px]">
        <SearchIcon className="fill-gray group-focus-within:fill-white" />
      </div>
      <input
        className="px-[55px] w-full h-[50px] text-white bg-transparent rounded-[25px] border-2 border-gray focus:border-white border-solid outline-none"
        type="text"
        placeholder="Search"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        defaultValue={query}
      />
    </div>
  );
};

export default SearchInput;
