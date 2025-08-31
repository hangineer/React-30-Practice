const LabelBadge = ({ label }) => {
  const bgColor = `#${label.color}`;

  return (
    <div
      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {label.name}
    </div>
  );
};

export default LabelBadge;
