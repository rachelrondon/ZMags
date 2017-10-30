require('sinon-as-promised');
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import axios from 'axios';
import HackerNews, {componentDidMount, Url } from './HackerNews';

describe('HackerNews', () => {
  it('calls componentDidMount',() => {

    const componentDidMount = sinon.stub().resolves();
    const component = mount(<HackerNews componentDidMount={componentDidMount} />);
    expect(componentDidMount.callCount).to.equal(1);
  });

  it('sets component state to returned data', async () => {

    const storyData = [
      { id: 1, title: 'Story One', score: 25},
      { id: 2, title: 'Story Two', score: 5 },
      { id: 3, title: 'Story Three', score: 100}
    ]

    const componentDidMount = sinon.stub().resolves();
    const component = mount(<HackerNews componentDidMount={componentDidMount} />);
    expect(component.state('loaded')).is.equal(true);
    expect(component.state('stories')).is.equal(someData);
  });

  it('calls the top stories  endpoint', () => {
    sinon.stub(axios, 'get');
    componentDidMount();
    expect(axios.get.firstCall.args[0]).to.equal(`${url}/topstories.json`)
    axios.get.restore();
  })
});
