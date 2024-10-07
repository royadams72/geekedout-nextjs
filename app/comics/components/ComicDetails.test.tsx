// ComicDetails.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ComicDetails from "@/app/comics/components/ComicDetails";
import { ComicDetail } from "@/shared/interfaces/comic";

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
    const preloadedState: ComicDetail = {
      id: 1,
      name: "Amazing Spider-Man",
      description: "A classic comic about Spider-Man",
      image: "http://image/link",
      onsaleDate: "22/12/1972",
      category: "comic",
      // creators?: Array<{ name: string; role: string } | undefined>;
      // onsaleDate: string;
      // description?: string;
      // id: number | string;
      // image: string;
      // pageCount?: number;
      // printPrice?: number;
      // name: string;
      // clickThrough?: string;
      // category: string;
      // add other fields as per ComicDetail interface
    };

    render(<ComicDetails preloadedState={preloadedState} />);

    // Assert that ItemDetails component is rendered
    expect(screen.getByTestId("item-details")).toBeInTheDocument();

    // Assert that Comic component receives the correct prop
    expect(screen.getByTestId("comic-details")).toHaveTextContent(
      preloadedState.name
    );
  });
});
