// @flow

import React from 'react';
import { Flex, Box } from 'grid-styled';

import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';

const TimeSelect = props => {
  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel htmlFor="input">{props.label}</InputLabel>
      <Select
        value={props.value || 0}
        onChange={(e) => props.onChange(e.target.value)}
        input={<Input fullWidth id="input" />}
      >
        {
          props.items.map((item, id) => (
            <MenuItem
              key={id}
              value={item.value} >
              {item.name}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>

  )
}

export default class DatePicker extends React.Component {

  state = {
    hour: 0,
    minute: 0,
    day: 0,
    month: 0,
    year: 0,
  }

  componentDidMount() {
    this.setState(
      this.getDateComp(this.props.date || new Date())
    );
  }

  getDateComp(date: Date) {
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    }
  }

  daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  buildHours = () => {
    let hours = [];
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  }

  buildMinutes = () => {
    let minutes = [];
    for (var i = 0; i < 60; i++) {
      minutes.push(i);
    }
    return minutes;
  }

  buildDays = () => {
    const { month, year } = this.state;
    let days = [];
    for (var i = 0; i < this.daysInMonth(month, year); i++) {
      days.push(i + 1);
    }
    return days;
  }

  buildMonths = () => {
    let months = [];
    for (var i = 0; i < 12; i++) {
      months.push(i);
    }
    return months;
  }

  buildYears = () => {
    let years = [];
    let startYear = this.props.startYear || 2000;
    let endYear = this.props.endYear || new Date().getFullYear() + 10;
    for (var i = startYear; i < endYear; i++) {
      years.push(i);
    }
    return years;
  }

  onChange = (name: string) => (value: string) => {
    this.setState({ [name]: value });
    const {
      hour, minute,
      day, month, year,
    } = { ...this.state, [name]: value };
    this.props.onChange(new Date(year, month, day, hour, minute))
  }

  render() {
    const hours = this.buildHours().map(e => ({ value: e, name: e }));
    const minutes = this.buildMinutes().map(e => ({ value: e, name: e }));
    const days = this.buildDays().map(e => ({ value: e, name: e }));
    const months = this.buildMonths().map(e => ({ value: e, name: e + 1 }));
    const years = this.buildYears().map(e => ({ value: e, name: e }));
    const {
      hour, minute,
      day, month, year,
    } = this.state;
    return (
      <div>
        <Flex>
          <Box p={1} w={1} >
            <TimeSelect label="Heure" value={hour} items={hours} onChange={this.onChange('hour')} />
          </Box>
          <Box p={1} w={1} >
            <TimeSelect label="Minute" value={minute} items={minutes} onChange={this.onChange('minute')} />
          </Box>
          <Box p={1} w={1} >
            <TimeSelect label="Jour" value={day} items={days} onChange={this.onChange('day')} />
          </Box>
          <Box p={1} w={1} >
            <TimeSelect label="Mois" value={month} items={months} onChange={this.onChange('month')} />
          </Box>
          <Box p={1} w={1} >
            <TimeSelect label="Année" value={year} items={years} onChange={this.onChange('year')} />
          </Box>
        </Flex>
      </div>
    );
  }
}