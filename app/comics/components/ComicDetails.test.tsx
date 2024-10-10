import React from "react";
import { render, screen } from "@testing-library/react";

import { ComicDetail } from "@/shared/interfaces/comic";
import { comicDetailMock } from "@/__mocks__/comics.mocks";

import ComicDetails from "@/app/comics/components/ComicDetails";

jest.mock(
  "@/shared/components/item-details/ItemDetails",
  () =>
    ({ children }: any) =>
      <div data-testid="item-details">{children}</div>
);

jest.mock("@/app/comics/components/Comic", () => ({ comicDetails }: any) => (
  <div data-testid="comic-details">{comicDetails.name}</div>
));

describe("ComicDetails Component", () => {
  it("renders correctly with preloadedState", () => {
    const preloadedState: ComicDetail = comicDetailMock;

    render(<ComicDetails preloadedState={preloadedState} />);
    expect(screen.getByTestId("item-details")).toBeInTheDocument();

    expect(screen.getByTestId("comic-details")).toHaveTextContent(
      preloadedState.name
    );
  });
});
