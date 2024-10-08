const { Group, User } = require("../models/Group");

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      order: ["name", "DESC"],
      include: User,
    });
    res.json(groups);
  } catch (err) {
    console.error("Error in getAllGroups:", err);
    res.status(500).send("Server error");
  }
};

exports.getGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findByPk(id, {
      include: User,
    });
    if (!group) {
      return res.status(404).send("Group not found");
    }
    res.json(group);
  } catch (err) {
    console.error("Error in getGroupById:", err);
    res.status(500).send("Server error");
  }
};

exports.createGroup = async (req, res) => {
  const { name, memberIds } = req.body;

  try {
    const group = await Group.create({ name });

    if (memberIds && memberIds.length > 0) {
      const users = await User.findAll({
        where: {
          id: memberIds,
        },
      });
      await group.addUsers(users);
    }

    res.status(201).json(group);
  } catch (err) {
    console.error("Error in createGroup:", err);
    res.status(500).send("Server error");
  }
};

exports.updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, memberIds } = req.body;

  try {
    const group = await Group.findByPk(id);
    if (!group) {
      return res.status(404).send("Group not found");
    }

    group.name = name || group.name;
    await group.save();

    if (memberIds) {
      const users = await User.findAll({
        where: {
          id: memberIds,
        },
      });
      await group.setUsers(users);
    }

    res.json(group);
  } catch (err) {
    console.error("Error in updateGroup:", err);
    res.status(500).send("Server error");
  }
};

exports.deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findByPk(id);
    if (!group) {
      return res.status(404).send("Group not found");
    }

    await group.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Error in deleteGroup:", err);
    res.status(500).send("Server error");
  }
};
