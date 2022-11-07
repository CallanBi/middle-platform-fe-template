import React, { FC, useState, useEffect } from 'react';
import { useGetDataSource } from '@/api';
import { message } from 'antd';
import { AxiosError } from 'axios';
import Loading from '@/components/illustration/loading';
import { css } from '@emotion/react';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';

const overviewPage: FC = () => {
  const [getDataSourceReqParams, setGetDataSourceReqParams] = useState({
    enableRequest: true,
    onSuccess: () => {
      setGetDataSourceReqParams({
        ...getDataSourceReqParams,
        enableRequest: false,
      });
    },
    onError: (err: API.ErrorResp) => {
      message.error(
        `Data source not found. Error message:${err?.response?.data?.error}`
      );
      setGetDataSourceReqParams({
        ...getDataSourceReqParams,
        enableRequest: false,
      });
    },
  });

  const { isLoading, isSuccess, isError, data, error } = useGetDataSource({
    enabled: getDataSourceReqParams?.enableRequest,
    retry: false,
    cacheTime: 0,
    onSuccess: getDataSourceReqParams?.onSuccess,
    onError: getDataSourceReqParams?.onError,
  });

  return (
    <div>
      overview
      {isLoading && (
        <section
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <Loading></Loading>
        </section>
      )}
      {isSuccess && (
        <div>{`data source interface: ${JSON.stringify(data)}`}</div>
      )}
      {isError && (
        <ErrorIllustrator
          desc={`Error message: ${error?.response?.data?.error}`}
        />
      )}
    </div>
  );
};

export default overviewPage;
