import renderer from "react-test-renderer";
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from "./button";

describe('Button component tests', () => {
  it("button without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("button with text", () => {
    const tree = renderer.create(<Button text="text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("button disabled", () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("button isLoader", () => {
    const tree = renderer.create(<Button isLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('button with callback', () => {
    window.alert = jest.fn()
    render(<Button text='test button' onClick={alert('test')} />)
    const button = screen.getByText('test button')
    fireEvent.click(button)
    expect(window.alert).toHaveBeenCalledWith('test')
  })
})
