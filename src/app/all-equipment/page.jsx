"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EquipmentCard from "@/components/shared/EquipmentCard";
import { publicFetch } from "@/lib/api";
import { categories, rentalTypes } from "@/lib/constants";

const selectClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

const emptyFilters = {
  search: "",
  category: "",
  rentalType: "",
  availability: "",
  minPrice: "",
  maxPrice: "",
  sort: "recent",
};

export default function AllEquipmentPage() {
  const [filters, setFilters] = useState(emptyFilters);
  const [draft, setDraft] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
  });
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ items: [], total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // read ?category=... from the link on the home page
  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get(
      "category",
    );
    if (category) {
      setFilters((current) => ({ ...current, category }));
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    const params = new URLSearchParams({ page, limit: 9 });
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    setLoading(true);
    publicFetch(`/equipment?${params}`)
      .then((data) => {
        if (!ignore) {
          setResult(data);
          setError("");
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [filters, page]);

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  };

  const applyTextFilters = (event) => {
    event.preventDefault();
    setFilters((current) => ({ ...current, ...draft }));
    setPage(1);
  };

  const clearAll = () => {
    setFilters(emptyFilters);
    setDraft({ search: "", minPrice: "", maxPrice: "" });
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">All Equipment</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Browse approved equipment from verified owners.
      </p>

      {/* Search and price range */}
      <form
        onSubmit={applyTextFilters}
        className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
      >
        <Input
          className="h-10 lg:col-span-2"
          placeholder="Search by name or location"
          value={draft.search}
          onChange={(e) => setDraft({ ...draft, search: e.target.value })}
        />
        <Input
          className="h-10"
          type="number"
          min="0"
          placeholder="Min price"
          value={draft.minPrice}
          onChange={(e) => setDraft({ ...draft, minPrice: e.target.value })}
        />
        <Input
          className="h-10"
          type="number"
          min="0"
          placeholder="Max price"
          value={draft.maxPrice}
          onChange={(e) => setDraft({ ...draft, maxPrice: e.target.value })}
        />
        <Button type="submit" className="h-10">
          Apply
        </Button>
      </form>

      {/* Dropdown filters and sorting */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <select
          className={selectClass}
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={filters.rentalType}
          onChange={(e) => updateFilter("rentalType", e.target.value)}
        >
          <option value="">All rental types</option>
          {rentalTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={filters.availability}
          onChange={(e) => updateFilter("availability", e.target.value)}
        >
          <option value="">Any availability</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <select
          className={selectClass}
          value={filters.sort}
          onChange={(e) => updateFilter("sort", e.target.value)}
        >
          <option value="recent">Recently added</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>

        <Button
          type="button"
          variant="outline"
          className="h-10"
          onClick={clearAll}
        >
          Clear filters
        </Button>
      </div>

      {/* Results */}
      {error ? (
        <p className="mt-10 text-center text-sm text-red-500">{error}</p>
      ) : loading ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Loading...
        </p>
      ) : result.items.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No equipment matches your search.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result.items.map((item) => (
            <EquipmentCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {result.pages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {result.page} of {result.pages}
          </span>
          <Button
            variant="outline"
            disabled={page >= result.pages}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
