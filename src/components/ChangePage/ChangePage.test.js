import { render, screen } from '@testing-library/react';
import ChangePage from './ChangePage';

test('the first and prev button is disabled',() => {
    render(<ChangePage pageNumber={1} prev={null}/>);

    expect(screen.getByRole('button', {name: /first/i})).toBeDisabled();
    expect(screen.getByRole('button', {name: /prev/i})).toBeDisabled();
})

test('the last and next button is disabled',() => {
    render(<ChangePage pageNumber={84} last={84} next={null}/>);

    expect(screen.getByRole('button', {name: /last/i})).toBeDisabled();
    expect(screen.getByRole('button', {name: /next/i})).toBeDisabled();
})

test('the buttons are enabled',() => {
    render(<ChangePage pageNumber={2} prev={1} next={3} last={84} />);

    expect(screen.getByRole('button', {name: /first/i})).toBeEnabled();
    expect(screen.getByRole('button', {name: /prev/i})).toBeEnabled();
    expect(screen.getByRole('button', {name: /last/i})).toBeEnabled();
    expect(screen.getByRole('button', {name: /next/i})).toBeEnabled();
})