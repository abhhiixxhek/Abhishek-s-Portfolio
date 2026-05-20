import { render } from '@testing-library/react';

// Mock CSS imports from node_modules that Jest can't parse
jest.mock('bootstrap/dist/css/bootstrap.min.css', () => ({}));
jest.mock('react-pdf/dist/esm/Page/AnnotationLayer.css', () => ({}));
jest.mock('react-pdf/dist/esm/Page/TextLayer.css', () => ({}));

// Mock react-pdf since it requires worker setup
jest.mock('react-pdf', () => ({
  Document: ({ children }) => <div data-testid="pdf-document">{children}</div>,
  Page: () => <div data-testid="pdf-page" />,
  pdfjs: { GlobalWorkerOptions: {} },
}));

// Mock react-tsparticles to avoid canvas rendering issues
jest.mock('react-tsparticles', () => () => <div data-testid="particles" />);

import App from './App';

test('renders without crashing', () => {
  render(<App />);
});
