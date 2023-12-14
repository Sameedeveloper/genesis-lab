//@ts-nocheck
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../src/app/signIn/page';
import { signIn } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
}));

describe('SignIn Page', () => {
  it('allows the user to login', async () => {
    const { getByLabelText, getByRole } = render(<SignIn/>);

    signIn.mockResolvedValueOnce({ error: null });

    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });

    fireEvent.click(getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password',
      });
    });

   
  });

  it('shows an error with wrong credentials', async () => {
    const { getByLabelText, getByRole } = render(<SignIn />);

    signIn.mockResolvedValueOnce({ error: 'CredentialsSignin' });

    fireEvent.change(getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'wrong' } });

    fireEvent.click(getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'wrong@example.com',
        password: 'wrong',
      });
    });

  });
});
