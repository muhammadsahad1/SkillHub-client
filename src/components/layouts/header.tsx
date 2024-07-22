import logo from '../../assets/skill.png';

const Header = () => {
  return (
    <div className='w-full bg-white px-4 py-3 flex items-center'>
      <img src={logo} className="w-12 h-12" alt="Skill Logo" />
      <h2 className='font-bold ml-4 mt-1 text-xl'>Skill Hub</h2>
    </div>
  );
};

export default Header;
