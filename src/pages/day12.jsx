import { useState } from "react";
import { Button } from "@headlessui/react";
import { Dialog } from '@headlessui/react'
import { Popover } from '@headlessui/react'
import { formatTime } from "@/utils/helpers";
// TODO: use DatePicker instead of Popover
// import DatePicker from "react-datepicker";

function Day12() {
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isContactDetailsDialogOpen, setIsContactDetailsDialogOpen] = useState(false);
  const [reservation, setReservation] = useState({
    name: "",
    personCount: 2,
    phone: "",
    reservationDate: new Date(),
    reservationTime: new Date(),
  });

  function PersonBlock({personCount, setPersonCount}) {
    return (
      <Popover className="relative">
        <Popover.Button className="bg-sky-100 py-3 px-5 rounded w-full text-left hover:bg-sky-200 transition-colors">
          <span className="italic text-xs mr-7">People</span>
          <span className="font-medium">{personCount} people</span>
        </Popover.Button>

        <Popover.Panel
          anchor="bottom"
          className="shadow-xl rounded p-5 bg-white mt-2 w-80"
        >
          {({ close }) => (
            <div className="grid grid-cols-5 gap-4">
              {[...Array(10).keys()].map((countOption) => {
                const count = countOption + 1;
                const isSelected = count === personCount;
                return (
                  <Button
                    key={count}
                    onClick={() => {
                      setPersonCount(prev => ({...prev, personCount: count}));
                      close();
                    }}
                    className={`rounded border-2 py-2 px-4 text-sm shadow-sm transition-colors ${
                      isSelected
                        ? 'bg-sky-500 border-sky-600 text-white'
                        : 'bg-white border-slate-300 hover:border-sky-500 hover:text-sky-500'
                    }`}
                  >
                    {count}
                  </Button>
                );
              })}
            </div>
          )}
        </Popover.Panel>
      </Popover>
    );
  }

  function DateBlock({reservationDate, setReservationDate}) {

    const generateDateOptions = () => {
      const dates = [];
      const today = new Date();

      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
      }

      return dates;
    };

    const dateOptions = generateDateOptions();

    return (
      <Popover className="relative">
        <Popover.Button className="bg-sky-100 py-3 px-5 rounded w-full text-left hover:bg-sky-200 transition-colors">
          <span className="italic text-xs mr-7">Date</span>
          <span className="font-medium">{reservationDate.toLocaleDateString()}</span>
        </Popover.Button>

        <Popover.Panel
          anchor="bottom"
          className="shadow-xl rounded p-5 bg-white mt-2 w-80"
        >
          {({ close }) => (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {dateOptions.map((date) => {
                const isSelected = date.toDateString() === reservationDate.toDateString();
                const isToday = date.toDateString() === new Date().toDateString();

                return (
                  <Button
                    key={date.toISOString()}
                    onClick={() => {
                      setReservationDate(prev => ({...prev, reservationDate: date}));
                      close();
                    }}
                    className={`w-full text-left p-3 rounded border transition-colors ${
                      isSelected
                        ? 'bg-sky-500 border-sky-600 text-white'
                        : 'bg-white border-slate-200 hover:border-sky-500 hover:bg-sky-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {date.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      {isToday && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          isSelected ? 'bg-sky-600 text-white' : 'bg-sky-100 text-sky-600'
                        }`}>
                          Today
                        </span>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
          )}
        </Popover.Panel>
      </Popover>
    )
  }

  function TimeBlock({reservationTime, setReservationTime}) {

    const generateTimeOptions = () => {
      const times = [];
      const startHour = 11; // 11:00 AM
      const endHour = 21;   // 09:00 PM

      // TODO: double loop
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) { // 每 30 分鐘一個區段
          const time = new Date();
          time.setHours(hour, minute, 0, 0);
          times.push(time);
        }
      }

      return times;
    };

    const timeOptions = generateTimeOptions();


    return (
      <Popover className="relative">
        <Popover.Button className="bg-sky-100 py-3 px-5 rounded w-full text-left hover:bg-sky-200 transition-colors">
          <span className="italic text-xs mr-7">Time</span>
          <span className="font-medium">{formatTime(reservationTime)}</span>
        </Popover.Button>
        <Popover.Panel
          anchor="bottom"
          className="shadow-xl rounded p-5 bg-white mt-2 w-80"
        >
          {({ close }) => (
            <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              {timeOptions.map((time) => {
                const isSelected = time.getTime() === reservationTime.getTime();

                return (
                  <Button
                    key={time.toISOString()}
                    onClick={() => {
                      setReservationTime(prev => ({...prev, reservationTime: time}));
                      close();
                    }}
                    className={`p-2 rounded border text-sm transition-colors ${
                      isSelected
                        ? 'bg-sky-500 border-sky-600 text-white'
                        : 'bg-white border-slate-200 hover:border-sky-500 hover:bg-sky-50'
                    }`}
                  >
                    {formatTime(time)}
                  </Button>
                );
              })}
            </div>
          )}
        </Popover.Panel>
      </Popover>
    )
  }

  function BackGround() {
    {/* 背景遮罩 */}
    return (
      <div className="fixed z-0 inset-0 bg-black/30" aria-hidden="true" />
    )
  }

  function ContactDetailsDialog() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleConfirmReservation = () => {
      console.log("reservation confirm", name, phone);
      setIsContactDetailsDialogOpen(false);
    };

    return (
      <Dialog
        className="relative z-50 text-black"
        open={isContactDetailsDialogOpen}
        onClose={() => setIsContactDetailsDialogOpen(false)}
      >
        <BackGround />
        <div className="text-black fixed inset-0 flex items-center justify-center p-4 z-50">
          <Dialog.Panel className="rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold mb-4 text-black">
              Contact Details
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-4">
              You are making a reservation for <b>{reservation.personCount} people</b>, on <b>{reservation.reservationDate.toLocaleDateString()}</b> at <b>{reservation.reservationTime.toLocaleTimeString()}</b>.
            </Dialog.Description>
            <div className="flex flex-col mb-4">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="input bg-white border border-black rounded p-2" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" className="input bg-white border border-black rounded p-2" value={phone} onChange={e => setPhone(e.target.value)}/>
            </div>
            <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white cursor-pointer mt-6" onClick={() => handleConfirmReservation()}>Confirm Reservation</Button>
          </Dialog.Panel>
        </div>
      </Dialog>
    )
  }

  function ReserveDialog() {
    const bookNow = () => {
      setIsContactDetailsDialogOpen(true);
      setIsMainDialogOpen(false);
    };

    return (
      <Dialog className="relative z-50 text-black" open={isMainDialogOpen} onClose={() => setIsMainDialogOpen(false)}>
        <BackGround />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold mb-4 text-black">
              Book a table
            </Dialog.Title>

            <Dialog.Description className="text-sm text-gray-500 mb-4">
              This is what you'll add the details for your booking
            </Dialog.Description>

            <div className="flex flex-col gap-4">
              <PersonBlock personCount={reservation.personCount} setPersonCount={setReservation} />
              <DateBlock reservationDate={reservation.reservationDate} setReservationDate={setReservation} />
              <TimeBlock reservationTime={reservation.reservationTime} setReservationTime={setReservation} />
            </div>

            <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white cursor-pointer mt-6" onClick={() => bookNow()}>Book now</Button>
          </Dialog.Panel>
        </div>
      </Dialog>
    )
  }

  return (
    <>
      <h2 className="text-2xl">Day 12: Build a restaurant reservation widget</h2>
      <a href="https://reactpractice.dev/exercise/build-a-restaurant-reservation-widget/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>

      <div className="mt-6">
        <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white cursor-pointer mt-6" onClick={() => setIsMainDialogOpen(true)}>Book a table</Button>
      </div>

      <ReserveDialog />
      <ContactDetailsDialog />
    </>
  );
};

export default Day12;
