const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_wrapper flex items-center justify-between p-4">
        <div className="navbar_left">
          <div className="flex items-center outline-blue-700 border">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input
              className="p-2 outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <ul className="navbar_right flex items-center gap-8 xl:text-4xl">
          <li>
            <i class="fa fa-moon-o" aria-hidden="true"></i>
          </li>
          <li>
            <i class="fa fa-bell" aria-hidden="true"></i>
          </li>
          <li>
            <img
              src="https://imgv3.fotor.com/images/slider-image/a-beautiful-woman-with-long-hair-in-anime-character_2022-12-15-081925_fjmg.png"
              alt=""
              className="h-12 w-12 object-center rounded-full"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
