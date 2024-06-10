import * as React from "react";
import "@testing-library/jest-dom";
import axios from "axios";

export const useAxiosGet = (data: any) => {
  (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
    data,
  });
};
