import styled from '@emotion/styled';
import { Spin, Typography, Button } from 'antd';

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  // margin-bottom: ${(props) => props.marginBottom + 'rem'};
  margin-bottom: 2rem;
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === 'number'
        ? props.gap + 'rem'
        : props.gap
        ? '2rem'
        : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    {/*Spin: to indicate 'loading'*/}
    <Spin size={'large'} />
  </FullPage>
);

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <ErrorBox error={error} />
  </FullPage>
);

// type guard
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={'danger'}>{error?.message}</Typography.Text>;
  }
  return null;
};

export const ScreenContainer = styled.div`
  padding: 3.2rem 3.2rem 3.2rem 5rem;
  width: calc(100vw - 19rem);
  display: flex;
  flex-direction: column;
  // TODO
  overflow: scroll;
`;

export const ButtonNoPadding = styled(Button)`
  padding: 0;
  width:10rem;
`

