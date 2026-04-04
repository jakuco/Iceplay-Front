// src/app/core/models/championship.model.ts
var ChampionshipStatus;
(function(ChampionshipStatus2) {
  ChampionshipStatus2["Draft"] = "draft";
  ChampionshipStatus2["Registration"] = "registration";
  ChampionshipStatus2["Active"] = "active";
  ChampionshipStatus2["Finished"] = "finished";
  ChampionshipStatus2["Cancelled"] = "cancelled";
})(ChampionshipStatus || (ChampionshipStatus = {}));
var PhaseType;
(function(PhaseType2) {
  PhaseType2["League"] = "league";
  PhaseType2["Knockout"] = "knockout";
  PhaseType2["Groups"] = "groups";
  PhaseType2["Swiss"] = "swiss";
})(PhaseType || (PhaseType = {}));
var PhaseStatus;
(function(PhaseStatus2) {
  PhaseStatus2["Pending"] = "pending";
  PhaseStatus2["Active"] = "active";
  PhaseStatus2["Finished"] = "finished";
})(PhaseStatus || (PhaseStatus = {}));
var GroupType;
(function(GroupType2) {
  GroupType2["Group"] = "group";
  GroupType2["DirectAdvanced"] = "direct";
  GroupType2["Playoff"] = "playoff";
})(GroupType || (GroupType = {}));

export {
  ChampionshipStatus,
  PhaseStatus
};
//# sourceMappingURL=chunk-Z53GGAOI.js.map
