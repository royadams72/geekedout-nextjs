import React, { act } from "react";
import { render, screen } from "@testing-library/react";

import { ComicDetail } from "@/types/interfaces/comic";
import { comicDetailMock } from "@/__mocks__/comics/comics.mocks";

import Comic from "@/app/comics/components/Comic";

const mockComicDetails: ComicDetail = comicDetailMock;
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({ translatedText: mockComicDetails.description }),
  })
) as jest.Mock;
beforeEach(async () => {
  // global.fetch = jest.fn();
  await act(async () => {
    render(<Comic comicDetails={mockComicDetails} />);
  });
});

describe("ComicDetails Component", () => {
  it("renders published date", () => {
    expect(screen.getByText(/Published:/i)).toBeInTheDocument();
    expect(screen.getByText("06/06/2008")).toBeInTheDocument();
  });

  it("renders issue number", () => {
    expect(screen.getByText(/Issue No:/i)).toBeInTheDocument();
    expect(screen.getByText("13")).toBeInTheDocument();
  });

  it("renders description", () => {
    expect(screen.getByText(/Description:/i)).toBeInTheDocument();
    expect(screen.getByText(/This is the description./i)).toBeInTheDocument();
  });

  it("renders link", () => {
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", mockComicDetails.site_detail_url);
  });
});
