const contentComponent = ({
  content,
  customStyles,
  Category,
  Constructor,
  Designer,
  Predecessor,
  Engine,
  Transmission,
  Weight,
  Fuel,
}) => {
  return (
    <div style={customStyles}>
      <p style={{ lineHeight: '25px' }}>{content}</p>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <li style={{}}>
          <span
            style={{
              color: 'cyan',
              marginRight: '20px',
              fontWeight: 'bold',
            }}
          >
            Category
          </span>
          {Category}
        </li>
        <li>
          <span
            style={{
              color: 'cyan',
              marginRight: '20px',
              fontWeight: 'bold',
            }}
          >
            Constructor
          </span>
          {Constructor}
        </li>
        <li>
          <span
            style={{
              color: 'cyan',
              marginRight: '20px',
              fontWeight: 'bold',
            }}
          >
            Designer
          </span>
          {Designer}
        </li>
        <li>
          <span
            style={{
              color: 'cyan',
              marginRight: '20px',
              fontWeight: 'bold',
            }}
          >
            Predecessor
          </span>
          {Predecessor}
        </li>
        <li>
          <span
            style={{
              color: 'cyan',
              marginRight: '20px',
              fontWeight: 'bold',
            }}
          >
            Engine
          </span>
          {Engine}
        </li>
        <li>
          <span
            style={{
              color: 'cyan',
              marginRight: '20px',
              fontWeight: 'bold',
            }}
          >
            Transmission
          </span>
          {Transmission}
        </li>
        <li>
          <span
            style={{
              color: 'cyan',
              marginRight: '20px',
              fontWeight: 'bold',
            }}
          >
            Weight
          </span>
          {Weight}
        </li>
        <li>
          <span
            style={{
              color: 'cyan',
              marginRight: '20px',
              fontWeight: 'bold',
            }}
          >
            Fuel
          </span>
          {Fuel}
        </li>
      </ul>
    </div>
  )
}

export default contentComponent
