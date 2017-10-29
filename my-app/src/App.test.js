import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import HackerNews from './HackerNews';


describe('HackerNews', () => {
  it('calls componentDidMount',() => {

    const componentDidMount = sinon.stub();
    const component = mount(<HackerNews componentDidMount={componentDidMount} />);
    expect(componentDidMount.callCount).to.equal(1);

    // const storiesData = [
    //   {id: 1, title: 'TestOne', body:'Foo One'},
    //   {id: 2, title: 'TestTwo', body: 'Foo Two'},
    //   {id: 3, title: 'TestThree', body: 'Foo Three'}
    // ];

    // expect(component.state('loaded')).is.equal(true);
    // expect(component.state('topstories')).is.equal.to(someData);
  });
  it('sets component state to returned data')
  it('calls the topstories endpoint')
  it('calls the item endpoint')
  it('calls the user endpoint')
})