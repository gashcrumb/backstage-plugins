import React from 'react';

import { useEntity } from '@backstage/plugin-catalog-react';

import { render } from '@testing-library/react';

import data from '../../../__fixtures__/cluster1.json';
import { ClusterContextProvider } from './ClusterContext';

const mockEntity = {
  apiVersion: 'backstage.io/v1beta1',
  kind: 'Resource',
  spec: { owner: 'unknown', type: 'kubernetes-cluster' },
  metadata: {
    name: 'foo',
    namespace: 'default',
    annotations: {
      'janus-idp.io/ocm-provider-id': 'hub',
    },
  },
};

jest.mock('../ClusterContext/', () => ({
  useCluster: jest.fn().mockReturnValue({}),
}));

jest.mock('@backstage/plugin-catalog-react', () => ({
  useEntity: jest.fn().mockReturnValue({}),
}));

jest.mock('@backstage/core-plugin-api', () => ({
  ...jest.requireActual('@backstage/core-plugin-api'),
  useApi: () => ({
    getClusterByName: () => data,
  }),
}));

describe('ClusterContext', () => {
  beforeEach(() => {
    (useEntity as jest.Mock).mockClear();
  });

  it('should render children', () => {
    (useEntity as jest.Mock).mockReturnValue({ entity: mockEntity });
    const { getByText } = render(
      <ClusterContextProvider>Child</ClusterContextProvider>,
    );

    expect(getByText('Child')).toBeInTheDocument();
  });
});
