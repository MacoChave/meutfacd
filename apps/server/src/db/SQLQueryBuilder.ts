interface QueryBuilder<T> {
	select: (columns: string[]) => this;
	from: (table: string) => this;
	where: (condition: string, value: any) => this;
	whereOperator: (condition: string, operator: string, value: any) => this;
	orWhere: (condition: string, value: any) => this;
	limit: (count: number) => this;
	offset: (count: number) => this;
	groupBy: (columns: string[]) => this;
	orderBy: (columns: string[]) => this;
	set: (data: Partial<T>) => this;
	first: () => Promise<T>;
	get: () => Promise<T[]>;
	update: () => this;
	delete: () => this;
	insert: (data: Partial<T>) => this;
	toString: () => string;

	// Custom methods
	join: (table: string, condition: string) => this;
	leftJoin: (table: string, condition: string) => this;
	rightJoin: (table: string, condition: string) => this;
	innerJoin: (table: string, condition: string) => this;
	on: (condition: string) => this;
}

class SQLQueryBuilder<T> implements QueryBuilder<T> {
	private query: string = '';
	private table: string = '';
	private columns: string[] = [];
	private whereConditions: string[] = [];
	private limitCount: number = 0;
	private offsetCount: number = 0;
	private groupByColumns: string[] = [];
	private orderByColumns: string[] = [];
	private updateData: Partial<any> = {};
	private insertData: Partial<any> = {};
	private joinTable: string = '';
	private joinCondition: string = '';
	private onCondition: string = '';

	select(columns: string[]): this {
		this.columns = columns;
		return this;
	}

	from(table: string): this {
		this.table = table;
		return this;
	}

	where(condition: string, value: any): this {
		this.whereConditions.push(`${condition} = ${value}`);
		return this;
	}

	whereOperator(condition: string, operator: string, value: any): this {
		this.whereConditions.push(`${condition} ${operator} ${value}`);
		return this;
	}

	orWhere(condition: string, value: any): this {
		this.whereConditions.push(`OR ${condition} = ${value}`);
		return this;
	}

	limit(count: number): this {
		this.limitCount = count;
		return this;
	}

	offset(count: number): this {
		this.offsetCount = count;
		return this;
	}

	groupBy(columns: string[]): this {
		this.groupByColumns = columns;
		return this;
	}

	orderBy(columns: string[]): this {
		this.orderByColumns = columns;
		return this;
	}

	set(data: Partial<any>): this {
		this.updateData = data;
		return this;
	}

	async first(): Promise<any> {
		this.limit(1);
		const result = await this.get();
		return result[0];
	}

	get(): Promise<any[]> {
		this.query = `SELECT ${this.columns.join(', ')} FROM ${this.table}`;

		if (this.joinTable) {
			this.query += ` ${this.joinTable} ON ${this.joinCondition}`;
		}

		if (this.whereConditions.length) {
			this.query += ` WHERE ${this.whereConditions.join(' AND ')}`;
		}

		if (this.groupByColumns.length) {
			this.query += ` GROUP BY ${this.groupByColumns.join(', ')}`;
		}

		if (this.orderByColumns.length) {
			this.query += ` ORDER BY ${this.orderByColumns.join(', ')}`;
		}

		if (this.limitCount) {
			this.query += ` LIMIT ${this.limitCount}`;
		}

		if (this.offsetCount) {
			this.query += ` OFFSET ${this.offsetCount}`;
		}

		return this.execute();
	}

	update(): this {
		this.query = `UPDATE ${this.table} SET ${this.getUpdateData()}`;

		if (this.whereConditions.length) {
			this.query += ` WHERE ${this.whereConditions.join(' AND ')}`;
		}

		return this;
	}

	delete(): this {
		this.query = `DELETE FROM ${this.table}`;

		if (this.whereConditions.length) {
			this.query += ` WHERE ${this.whereConditions.join(' AND ')}`;
		}

		return this;
	}

	insert(data: Partial<any>): this {
		this.insertData = data;
		return this;
	}

	toString(): string {
		return this.query;
	}

	join(table: string, condition: string): this {
		this.joinTable = `JOIN ${table}`;
		this.joinCondition = condition;
		return this;
	}

	leftJoin(table: string, condition: string): this {
		this.joinTable = `LEFT JOIN ${table}`;
		this.joinCondition = condition;
		return this;
	}

	rightJoin(table: string, condition: string): this {
		this.joinTable = `RIGHT JOIN ${table}`;
		this.joinCondition = condition;
		return this;
	}

	innerJoin(table: string, condition: string): this {
		this.joinTable = `INNER JOIN ${table}`;
		this.joinCondition = condition;
		return this;
	}

	on(condition: string): this {
		this.onCondition = condition;
		return this;
	}

	private getUpdateData(): string {
		return Object.keys(this.updateData)
			.map((key) => `${key} = ${this.updateData[key]}`)
			.join(', ');
	}

	private execute(): Promise<any[]> {
		return new Promise((resolve, reject) => {
			// Execute the query here
		});
	}

	// Other methods
}
