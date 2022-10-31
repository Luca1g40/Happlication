package com.infosupport.happ.application.converter;

import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.domain.Table;
import org.springframework.stereotype.Component;

@Component
public class AreaConverter {

        public TableData createTableData(Table table) {
        return new TableData(table.getAmountOfPeople(),
                table.getTableNumber(),
                table.getElapsedTimeSinceOrder(),
                table.getTimeLeftToOrder(),
                table.getOrders(),
                table.getTableStatus(),
                table.getShoppingCart(),
                table.isHulpNodig());
    }
}
