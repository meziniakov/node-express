const menu = ['Main', 'Service', 'Contacts'];

function Header(props) {
  console.log(props.title);
  return (
    <>
      <div>
        <ul>
          {menu.map((el) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Header;
