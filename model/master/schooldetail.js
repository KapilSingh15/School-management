module.exports = (sequelize, DataTypes) => {
    const SchoolDetails = sequelize.define('SchoolDetails', {
      SchoolID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      SchoolName: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      Address: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      ContactNo: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      EmailID: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      FaxNo: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      Website: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      Logo: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  
    return SchoolDetails;
  };
  