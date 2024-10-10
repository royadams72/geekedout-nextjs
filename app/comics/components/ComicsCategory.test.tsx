import React from "react";

import { render, screen } from "@testing-library/react";

import Category from "@/shared/components/category/Category";
import { comicStoreMock } from "@/__mocks__/comics.mocks";

import Comic from "@/app/comics/components/Comic";
import { ComicStore } from "@/shared/interfaces/comic";
import ComicsDisplay from "@/app/comics/components/ComicsCategory";
import { Preview } from "@/shared/interfaces/preview";

const comicStore: ComicStore = comicStoreMock;
beforeEach(() => {
  render(<Category<Preview> preloadedState={comicStore} />);
});
