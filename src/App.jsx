import { nanoid } from 'nanoid';
import { Component } from 'react';

import Section from 'components/Section';
import Form from './components/Form';
import Users from './components/Users';
import Filter from 'components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const pasredUsers = JSON.parse(localStorage.getItem('users'));
    if (pasredUsers) {
      this.setState({ contacts: pasredUsers });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('users', JSON.stringify(this.state.contacts));
    }
  }

  addUser = ({ name, number }) => {
    const { contacts } = this.state;

    if (contacts.find(el => el.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(({ contacts }) => {
        const user = {
          name,
          number,
          id: nanoid(),
        };
        return {
          contacts: [...contacts, user],
        };
      });
    }
  };

  removeUser = id => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(item => item.id !== id),
      };
    });
  };

  getFilteredUsers = () => {
    const { filter, contacts } = this.state;

    if (!filter) {
      return contacts;
    }
    const filterValue = filter.toLowerCase();
    const filteredUsers = contacts.filter(({ name }) => {
      const nameValue = name.toLowerCase();
      return nameValue.includes(filterValue);
    });

    return filteredUsers;
  };

  handleFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  render() {
    return (
      <div>
        <Section title={'Phonebook'}>
          <Form onSubmit={this.addUser} />
        </Section>
        <Section title={'Contancts'}>
          <Filter handleFilter={this.handleFilter}/>
          <Users
            removeUser={this.removeUser}
            getFilteredUsers={this.getFilteredUsers()}
            handleFilter={this.handleFilter}
          />
        </Section>
      </div>
    );
  }
}

export default App;
