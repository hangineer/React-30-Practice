import { useState, useEffect } from "react";

// https://openholidaysapi.org/swagger/index.html
const apiUrl = "https://openholidaysapi.org";

async function getCountries() {
  const params = new URLSearchParams({
    languageIsoCode: "EN",
  });
  const res = await fetch(`${apiUrl}/Countries?${params}`);
  if (!res.ok) throw new Error("Can't fetch Country List");

  const data = await res.json();
  return data.map((country) => ({
    isoCode: country.isoCode,
    label: country.name.find((el) => el.language === "EN").text,
  }));
}

async function getHolidays(selectedCountryIso) {
  const year = new Date().getFullYear();
  const validFrom = `${year}-01-01`;
  const validTo = `${year}-12-31`;
  const params = new URLSearchParams({
    countryIsoCode: selectedCountryIso,
    validFrom,
    validTo,
  });

  const res = await fetch(`${apiUrl}/PublicHolidays?${params}`);
  if (!res.ok) throw new Error("Can't fetch Holiday List");
  const data = await res.json();
  return data;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
}

function Day1() {
  const [selectedCountryIso, setSelectedCountryIso] = useState("NL"); // NL(Netherlands) 預設荷蘭
  const [countryList, setCountryList] = useState([]);
  const [holidayList, setHolidayList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const countryInfo = await getCountries();
        setCountryList(countryInfo);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const holidays = await getHolidays(selectedCountryIso);
        setHolidayList(holidays);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [selectedCountryIso]);

  return (
    <>
      <h2 className="text-2xl">Day 1: Public Holidays APP</h2>
      <a href="https://reactpractice.dev/exercise/build-a-public-holidays-app/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>
      <select
        className="block mt-4 w-100 border p-2"
        name="holidays"
        id="holidays"
        value={selectedCountryIso}
        onChange={(e) => setSelectedCountryIso(e.target.value)}
      >
        {countryList.map((li) => {
          return (
            <option key={li.isoCode} value={li.isoCode}>
              {li.label}
            </option>
          );
        })}
      </select>
      <div>
        {holidayList.map((li) => {
          const holiday = li.name.find((el) => el.language === "EN").text;
          return (
            <div key={li.id}>
              {formatDate(li.startDate)} - {holiday}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Day1;
