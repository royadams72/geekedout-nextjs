import React from "react";
import { render, screen } from "@testing-library/react";

import { ComicDetail } from "@/shared/interfaces/comic";
import { comicDetailMock } from "@/__mocks__/comics/comics.mocks";

import Comic from "@/app/comics/components/Comic";

const mockComicDetails: ComicDetail = comicDetailMock;

beforeEach(() => {
  render(<Comic comicDetails={mockComicDetails} />);
});

describe("ComicDetails Component", () => {
  // it("renders publication date if available", () => {
  //   render(<Comic comicDetails={mockComicDetails} />);
  //   expect(screen.getByText(/Published:/i)).toBeInTheDocument();
  //   expect(screen.getByText(/01\/10\/2024/i)).toBeInTheDocument();
  // });

  it("renders price if available", () => {
    expect(screen.getByText(/Price:/i)).toBeInTheDocument();
    expect(screen.getByText(/£4.99/i)).toBeInTheDocument();
  });

  it("renders page count", () => {
    expect(screen.getByText(/Page Count:/i)).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("renders creators list", () => {
    expect(screen.getByText(/Writer:/i)).toBeInTheDocument();
    expect(screen.getByText(/Stan Lee/i)).toBeInTheDocument();
    expect(screen.getByText(/Artist:/i)).toBeInTheDocument();
    expect(screen.getByText(/John Byrne/i)).toBeInTheDocument();
  });

  it("renders description if available", () => {
    expect(
      screen.getByText(/A classic comic about Spider-Man/i)
    ).toBeInTheDocument();
  });

  it("renders link", () => {
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", mockComicDetails.clickThrough);
  });
});
