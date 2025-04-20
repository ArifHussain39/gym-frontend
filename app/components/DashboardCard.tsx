type DashboardCardProps = {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
  };
  
  const DashboardCard = ({ title, value, icon }: DashboardCardProps) => (
    <div className="bg-darkblue p-6 rounded-2xl shadow-md text-white flex items-center justify-between">
      <div>
        <h4 className="text-lg font-medium text-gray-300">{title}</h4>
        <p className="text-3xl font-semibold">{value}</p>
      </div>
      {icon && <div className="text-4xl text-bluish">{icon}</div>}
    </div>
  );
  
  export default DashboardCard;
  