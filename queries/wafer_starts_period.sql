SELECT
    DATE_FORMAT(WaferStatus.StartDate, '%Y.%m') AS StartMonth,
    WaferStatus.StartDate,
    WaferStatus.StopDate,
    Wafer.WaferIdentification,
    WaferQuality.Quality,
    Wafer.Remark,
    WaferStatus.Remark,
    WaferLocation.LocationName
FROM
    (ProductFamily
    INNER JOIN (Wafer
    LEFT JOIN WaferQuality ON Wafer.QualityIDRef = WaferQuality.QualityID) ON ProductFamily.ProductFamilyId = Wafer.ProductFamilyIDRef)
        INNER JOIN
    (WaferLocation
    INNER JOIN WaferStatus ON WaferLocation.LocationID = WaferStatus.WaferLocationIDRef) ON Wafer.WaferID = WaferStatus.WaferIDRef
WHERE
    DATE_FORMAT(WaferStatus.StartDate, '%Y.%m') > 2017.06
        AND DATE_FORMAT(WaferStatus.StartDate, '%Y.%m') < 2018.07
		AND ((WaferLocation.LocationName) LIKE '%FEOL%'
        AND (WaferLocation.LocationName) LIKE '%Part 1%')
ORDER BY WaferStatus.StartDate;


