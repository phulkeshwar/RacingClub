import { motion } from "framer-motion";

const members = [
  { name: "Aman Kumar", role: "Driver", image: "/assets/team1.jpg" },
  { name: "Pratik Gupta", role: "Chassis Lead", image: "/assets/team2.jpg" },
  { name: "Neha Singh", role: "Aerodynamics", image: "/assets/team3.jpg" },
  { name: "Arjun Patel", role: "Powertrain", image: "/assets/team4.jpg" }
];

export default function TeamGrid() {
  return (
    <section className="section team-section reveal-section">
      <div className="mx-auto w-[92vw] max-w-6xl">
        <h2 className="mb-5 text-3xl font-bold">Our Team</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <motion.article
              key={member.name}
              className="team-card overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#111111bb] shadow-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8 }}
            >
              <div className="relative overflow-hidden">
                <img src={member.image} alt={member.name} className="h-48 w-full object-cover transition-transform duration-500 ease-out team-card-image" />
                <div className="team-card-overlay absolute inset-0 bg-gradient-to-t from-[#e8192c] to-transparent opacity-0 transition-all duration-400" />
                <p className="team-card-role absolute bottom-3 left-3 opacity-0 text-base font-bold text-white transition-all duration-300">{member.role}</p>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-[#a0a0a0]">{member.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
