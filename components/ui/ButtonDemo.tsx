'use client';

/**
 * Button Demo Component
 * 
 * Demonstrates all Button component variants, sizes, and states
 * for testing and documentation purposes.
 */

import React, { useState } from 'react';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';

// Example icons for demonstration
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export function ButtonDemo() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleLoadingDemo = (buttonId: string) => {
    setLoading(buttonId);
    setTimeout(() => setLoading(null), 2000);
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-2">Button Component Demo</h1>
        <p className="text-gray-600">Showcasing all variants, sizes, and states</p>
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <ButtonGroup spacing="md">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </ButtonGroup>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <ButtonGroup spacing="md">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ButtonGroup>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <ButtonGroup spacing="md">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button
            loading={loading === 'loading-demo'}
            onClick={() => handleLoadingDemo('loading-demo')}
          >
            {loading === 'loading-demo' ? 'Loading...' : 'Click for Loading'}
          </Button>
        </ButtonGroup>
      </section>

      {/* Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Icons</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Left Icons</h3>
            <ButtonGroup spacing="md">
              <Button icon={{ position: 'left', component: PlusIcon }}>Add Item</Button>
              <Button variant="secondary" icon={{ position: 'left', component: DownloadIcon }}>Download</Button>
              <Button variant="danger" icon={{ position: 'left', component: TrashIcon }}>Delete</Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Right Icons</h3>
            <ButtonGroup spacing="md">
              <Button icon={{ position: 'right', component: DownloadIcon }}>Download</Button>
              <Button variant="secondary" icon={{ position: 'right', component: PlusIcon }}>Add New</Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Icon Only</h3>
            <ButtonGroup spacing="md">
              <Button
                icon={{ position: 'only', component: PlusIcon }}
                aria-label="Add item"
              />
              <Button
                variant="secondary"
                icon={{ position: 'only', component: DownloadIcon }}
                aria-label="Download"
              />
              <Button
                variant="danger"
                icon={{ position: 'only', component: TrashIcon }}
                aria-label="Delete"
              />
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Full Width */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Full Width</h2>
        <div className="max-w-md">
          <Button fullWidth>Full Width Button</Button>
        </div>
      </section>

      {/* Loading States with Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Loading with Icons</h2>
        <ButtonGroup spacing="md">
          <Button
            icon={{ position: 'left', component: PlusIcon }}
            loading={loading === 'icon-loading-1'}
            onClick={() => handleLoadingDemo('icon-loading-1')}
          >
            {loading === 'icon-loading-1' ? 'Adding...' : 'Add Item'}
          </Button>
          <Button
            variant="secondary"
            icon={{ position: 'only', component: DownloadIcon }}
            loading={loading === 'icon-loading-2'}
            onClick={() => handleLoadingDemo('icon-loading-2')}
            aria-label="Download file"
          />
        </ButtonGroup>
      </section>

      {/* Button Groups */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button Groups</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Horizontal</h3>
            <ButtonGroup orientation="horizontal" spacing="sm">
              <Button variant="secondary">Cancel</Button>
              <Button>Save</Button>
              <Button variant="danger">Delete</Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Vertical</h3>
            <ButtonGroup orientation="vertical" spacing="sm">
              <Button variant="ghost">Option 1</Button>
              <Button variant="ghost">Option 2</Button>
              <Button variant="ghost">Option 3</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Accessibility Demo */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Accessibility Features</h2>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            All buttons include proper ARIA attributes, focus states, and keyboard navigation.
            Try tabbing through the buttons and using Enter/Space to activate them.
          </p>
          <ButtonGroup spacing="md">
            <Button aria-describedby="help-text">Button with Description</Button>
            <Button disabled aria-label="This button is currently disabled">Disabled with Label</Button>
          </ButtonGroup>
          <p id="help-text" className="text-sm text-gray-500">
            This button has additional context provided via aria-describedby.
          </p>
        </div>
      </section>
    </div>
  );
}