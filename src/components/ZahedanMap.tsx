export default function ZahedanMap() {
  return (
    <div className="w-full h-64 overflow-hidden border border-gray-900 grayscale contrast-125">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114674.52495368541!2d60.79373972648434!3d29.502802742944715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ec57564d363b869%3A0x8e87851e3436d4f6!2sZahedan%2C+Sistan+and+Baluchestan%2C+Iran!5e0!3m2!1sen!2sus!4v1554477811902!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        title="Zahedan Map"
      />
    </div>
  );
}
