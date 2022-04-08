<nav
  className="navbar navbar-expand-lg navbar-light static-top mb-0 shadow"
  style={{ backgroundColor: '#fff', textAlign: 'left' }}
>
  <div className="container">
    <Link href="/">
      <img
        alt="Calorie Journal Logo"
        src="https://user-images.githubusercontent.com/37651620/142762093-45207811-0c6e-4b62-9cb2-8d0009efb4ea.png"
        width="70"
        height="70"
        className="d-inline-block align-top"
      />
    </Link>
    <div>
      <Button
        id="domain"
        aria-controls={open ? 'domain' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Домены
      </Button>
      <Menu id="domain" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <Link href="/domain/add" underline="none">
            Добавить
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/domain/all" underline="none">
            Все домены
          </Link>
        </MenuItem>
      </Menu>
    </div>
    <div>
      <Button
        id="project"
        aria-controls={open ? 'project' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Проекты
      </Button>
      <Menu
        id="project"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <Link href="/project/add" underline="none">
            Добавить
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/project/all" underline="none">
            Все проекты
          </Link>
        </MenuItem>
      </Menu>
    </div>
    <IconButton aria-label="fingerprint" color="success">
      <Fingerprint />
    </IconButton>
  </div>
</nav>;
