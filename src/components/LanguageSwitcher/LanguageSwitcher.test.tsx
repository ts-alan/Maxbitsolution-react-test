import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher component', () => {
  it('renders language switcher button', () => {
    render(<LanguageSwitcher />);
    
    const languageButton = screen.getByLabelText('Switch Language');
    expect(languageButton).toBeInTheDocument();
  });

  it('opens menu when button is clicked', () => {
    render(<LanguageSwitcher />);
    
    const languageButton = screen.getByLabelText('Switch Language');
    fireEvent.click(languageButton);
    
    expect(screen.getByText('🇺🇸 English')).toBeInTheDocument();
    expect(screen.getByText('🇷🇺 Russian')).toBeInTheDocument();
  });

  it('closes menu when language is selected', async () => {
    render(<LanguageSwitcher />);
    
    const languageButton = screen.getByLabelText('Switch Language');
    fireEvent.click(languageButton);
    
    const englishOption = screen.getByText('🇺🇸 English');
    fireEvent.click(englishOption);
    
    await waitFor(() => {
      expect(screen.queryByText('🇺🇸 English')).not.toBeInTheDocument();
    });
  });
}); 